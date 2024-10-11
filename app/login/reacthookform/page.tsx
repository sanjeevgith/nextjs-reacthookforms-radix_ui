"use client";
import React from "react";
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
import "@radix-ui/themes/styles.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Select, TextField, Theme, Text, Card, Box } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
// import simulatedApi from "../api/api";

const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required").regex(/^[A-Za-z]+$/, "Name must only contain alphabetic characters"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "You must be at least 18 years old"),
  gender: z.enum(["male", "female", "other"], {
    message: "Gender is required",
  }),
  address: z.object({
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
  }),
  hobbies: z
    .array(
      z.object({
        name: z.string().min(1, "Hobby name is required"),
        years: z.number().min(1, "Must be at least 1 year"),
      })
    )
    .min(1, "At least one hobby is required"),
  startDate: z.date(),
  subscribe: z.boolean(),
  referral: z.string().default(""),
});

// Define FormData type based on schema
type FormData = z.infer<typeof formSchema>;

const ReactHookFormWithZod: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
    trigger
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: 18,
      gender: undefined,
      address: { city: "", state: "" },
      startDate: new Date(),
      subscribe: false,
      referral: "",
    },
    resolver: zodResolver(formSchema),
  });



  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      //   const response = await simulatedApi(data);
      //   console.log("Success:", response);
    } catch (error: any) {
      console.error("Error:", error);
      setError("root", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (
    <>
      <Theme style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
      <Box maxWidth="100%" >
      <Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <div>
              <label>First Name</label>
              <TextField.Root
                {...register("firstName")}
                onChange={(e) => {
                  register("firstName").onChange(e);
                  trigger("firstName");
                }}
              />
              {errors.firstName && (
                <Text  size="1" style={{ color: "orangered" }}>{errors.firstName.message}</Text>
              )}
            </div>

          <div>
            <label>Last Name</label>
            <TextField.Root {...register("lastName")} />
            {errors.lastName && (
              <Text size="1" style={{ color: "orangered" }}>{errors.lastName.message}</Text>
            )}
          </div>

          <div>
            <label>Email</label>
            <TextField.Root {...register("email")} />
            {errors.email && (
              <Text size="1" style={{ color: "orangered" }}>{errors.email.message}</Text>
            )}
          </div>

          <div>
            <label>Age</label>
            <TextField.Root type="number" {...register("age")} />
            {errors.age && (
              <Text size="1" style={{ color: "orangered" }}>{errors.age.message}</Text>
            )}
          </div>

          <div>
            <Text>Gender </Text>
            <Select.Root {...register("gender")} >
              <Select.Trigger placeholder="-Select-" />
              <Select.Content>
                <Select.Group>
                  <Select.Label >-Select-</Select.Label>
                  <Select.Item value="male">Male</Select.Item>
                  <Select.Item value="female">Female</Select.Item>
                  <Select.Item value="other">Other</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>

            {errors.gender && (
              <Text size="1" style={{ color: "orangered" }}>{errors.gender.message}</Text>
            )}
          </div>

          <div>
            <label>Address</label>
            <TextField.Root {...register("address.city")} placeholder="City" />
            {errors.address?.city && (
              <Text size="1" style={{ color: "orangered" }}>
                {errors.address.city.message}
              </Text>
            )}

            <TextField.Root
              {...register("address.state")}
              placeholder="State"
            />
            {errors.address?.state && (
              <Text size="1" style={{ color: "orangered" }}>
                {errors.address.state.message}
              </Text>
            )}
          </div>

          <div>
            <label>Start Date</label>
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select date"
                  onChange={(date: Date | null) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />
          </div>


          <div>
            <label htmlFor="sub">Subscribe to Newsletter</label>
            <input type="checkbox" id="sub" {...register("subscribe")} />
          </div>

          {getValues("subscribe") && (
            <div>
              <label>Referral Source</label>
              <input
                {...register("referral")}
                placeholder="How did you hear about us?"
              />
              {errors.referral && (
                <p style={{ color: "orangered" }}>{errors.referral.message}</p>
              )}
            </div>
          )}

          {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
        </Card>
        </Box>
      </Theme>
    </>
  );
};

export default ReactHookFormWithZod;
