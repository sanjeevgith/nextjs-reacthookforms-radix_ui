"use client";
import React, { useEffect, useState } from "react";
import "@radix-ui/themes/styles.css";
import { Container, Grid, Table, TextField, Theme } from "@radix-ui/themes";
import {
  Flex,
  Text,
  Button,
  Avatar,
  Card,
  Box,
  Checkbox,
} from "@radix-ui/themes";
import Logindetails from "../logindetails/page";



export default function page() {
  const [data, setData] = useState<
    { id: number; title: string; views: number }[]
  >([]);

  const [id, setId] = useState<string>();
  const [title, setTitle] = useState<string>("");
  const [views, setViews] = useState<string>("");
  const [addbtn, setAddbtn] = useState<boolean>(true);
  const [editbtn, setEdittn] = useState<boolean>(false);


  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    //   const response = await fetch('/data.json');
    const response = await fetch("http://localhost:4000/posts");
    const json = await response.json();
    console.log("jsonData=>", json);
    setData(json);
  };

  const add = async () => {
    const dataPost = { id: id, title: title, views: views };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataPost),
    };
    await fetch("http://localhost:4000/posts", requestOptions);
    fetchData(); // Refresh data after adding
  };

  const editClick = async (id: number) => {
    setAddbtn(false)
    setEdittn(true)
    const response = await fetch(`http://localhost:4000/posts/${id}`);
    const json = await (await response).json();
    console.log("editData=>", json);
    setId(json.id);
    setTitle(json.title);
    setViews(json.views);
  };

  const updateClick = () => {
    const dataPost = { id: id, title: title, views: views };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataPost),
    };
    fetch(`http://localhost:4000/posts/${id}`, requestOptions)
    fetchData(); 
    setEdittn(false)
    setAddbtn(true)
  
  };

  const del = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/posts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log(`Post with id ${id} deleted successfully.`);
        fetchData(); 
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };


  return (
    <>
      <Theme>
        
        {/* <Grid columns="6" gap="1" rows="repeat(2, 64px)" width="50%">
          <Logindetails />
        </Grid> */}
        <Box maxWidth="540px">
          <Card>
            <TextField.Root
              placeholder="Enter ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            ></TextField.Root>
            <TextField.Root
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></TextField.Root>
            <TextField.Root
              placeholder="Enter Views"
              value={views}
              onChange={(e) => setViews(e.target.value)}
            ></TextField.Root>
            <Flex align="center" gap="3">
              <Button variant="classic" onClick={add} style={{ display: addbtn ? 'block' : 'none' }}>
                ADD
              </Button>
              <Button variant="classic" onClick={updateClick} style={{ display: editbtn ? 'block' : 'none' }}>
                UPDATE
              </Button>
            </Flex>
          </Card>
        </Box>

        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Views</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((element: any) => (
              <Table.Row key={element.id}>
                <Table.RowHeaderCell>{element.id}</Table.RowHeaderCell>
                <Table.Cell>{element.title}</Table.Cell>
                <Table.Cell>{element.views}</Table.Cell>
                <Table.Cell>
                  <Flex align="center" gap="3">
                    <Button
                      variant="classic"
                      onClick={() => editClick(element.id)}
                    >
                      Edit
                    </Button>
                    <Button variant="solid" onClick={() => del(element.id)}>
                      Delete
                    </Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Theme>
      
    </>
  );
}
