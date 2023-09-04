import { Donation } from "@/utils/types";
import { Paper, Text, Stack, Group, Title, Card } from "@mantine/core";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Donation() {
  const [donation, setDonation] = useState<Donation[] | null>([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://donation-server-production.up.railway.app/donation"
      );
      const data = res.data;
      setDonation(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!donation || !Array.isArray(donation)) return null;

  const totalAmount = donation.reduce(
    (sum, donationItem) => sum + donationItem.amount,
    0
  );
  return (
    <div>
      <Card withBorder shadow="xs" bg="gray.3">
        <Group mb={20}>
          <Title order={1} color="gray">
            Total
          </Title>
          <Title order={1} variant="gradient">
            {totalAmount}
          </Title>
          <Title order={1} color="gray">
            THB
          </Title>
        </Group>
        <Stack>
          {donation.map((donationItem) => (
            <Paper key={donationItem.id} shadow="xs" p="md" bg="cyan.2">
              <Group className="flex flex-col">
                <Text className="mb-[-10px]">
                  {" "}
                  Name: {donationItem.firstName} {donationItem.lastName}
                </Text>
                <Text className="mb-[-10px]">Email: {donationItem.email}</Text>
                <Text className="mb-[-10px]">
                  Amount: {donationItem.amount} ฿{" "}
                </Text>
                <Text>{dayjs(donationItem.time).format("D-MMM HH:mm:ss")}</Text>
              </Group>
            </Paper>
          ))}
        </Stack>
      </Card>
    </div>
  );
}
