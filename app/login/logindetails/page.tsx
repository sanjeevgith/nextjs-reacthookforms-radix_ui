import React from "react";
import { Container, Grid, Theme } from "@radix-ui/themes";
import {
  Flex,
  Text,
  Button,
  Avatar,
  Card,
  Box,
  Checkbox,
} from "@radix-ui/themes";

export default function page() {
  return (
    <>
      <div>Login Details Page</div>

      <Text as="label" size="2">
        <Flex gap="1">
          <Checkbox defaultChecked />
          Agree to Terms and Conditions
        </Flex>
      </Text>
    </>
  );
}
