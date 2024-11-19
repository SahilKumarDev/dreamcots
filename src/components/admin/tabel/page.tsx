import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  return [
    {
      index: 0,
      id: "728ed52f-" + Math.random().toString(36).substr(2, 9),
      amount: Math.floor(Math.random() * 10000),
      status: "pending",
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      name: `User ${Math.floor(Math.random() * 1000)}`,
    },
    {
      index: 1,
      id: "728ed52f-" + Math.random().toString(36).substr(2, 9),
      amount: Math.floor(Math.random() * 10000),
      status: "pending",
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      name: `User ${Math.floor(Math.random() * 1000)}`,
    },
    {
      index: 2,
      id: "728ed52f-" + Math.random().toString(36).substr(2, 9),
      amount: Math.floor(Math.random() * 10000),
      status: "pending",
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      name: `User ${Math.floor(Math.random() * 1000)}`,
    },
    {
      index: 3,
      id: "728ed52f-" + Math.random().toString(36).substr(2, 9),
      amount: Math.floor(Math.random() * 10000),
      status: "pending",
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      name: `User ${Math.floor(Math.random() * 1000)}`,
    },
    {
      index: 4,
      id: "728ed52f-" + Math.random().toString(36).substr(2, 9),
      amount: Math.floor(Math.random() * 10000),
      status: "pending",
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      name: `User ${Math.floor(Math.random() * 1000)}`,
    },
    {
      index: 5,
      id: "728ed52f-" + Math.random().toString(36).substr(2, 9),
      amount: Math.floor(Math.random() * 10000),
      status: "pending",
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      name: `User ${Math.floor(Math.random() * 1000)}`,
    },
    {
      index: 6,
      id: "728ed52f-" + Math.random().toString(36).substr(2, 9),
      amount: Math.floor(Math.random() * 10000),
      status: "pending",
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      name: `User ${Math.floor(Math.random() * 1000)}`,
    },
    {
      index: 7,
      id: "728ed52f-" + Math.random().toString(36).substr(2, 9),
      amount: Math.floor(Math.random() * 10000),
      status: "pending",
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      name: `User ${Math.floor(Math.random() * 1000)}`,
    },
    {
      index: 8,
      id: "728ed52f-" + Math.random().toString(36).substr(2, 9),
      amount: Math.floor(Math.random() * 10000),
      status: "pending",
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      name: `User ${Math.floor(Math.random() * 1000)}`,
    },
    {
      index: 9,
      id: "728ed52f-" + Math.random().toString(36).substr(2, 9),
      amount: Math.floor(Math.random() * 10000),
      status: "pending",
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      name: `User ${Math.floor(Math.random() * 1000)}`,
    },
    {
      index: 10,
      id: "728ed52f-" + Math.random().toString(36).substr(2, 9),
      amount: Math.floor(Math.random() * 10000),
      status: "pending",
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      name: `User ${Math.floor(Math.random() * 1000)}`,
    },
    {
      index: 11,
      id: "728ed52f-" + Math.random().toString(36).substr(2, 9),
      amount: Math.floor(Math.random() * 10000),
      status: "pending",
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      name: `User ${Math.floor(Math.random() * 1000)}`,
    },
    {
      index: 12,
      id: "728ed52f-" + Math.random().toString(36).substr(2, 9),
      amount: Math.floor(Math.random() * 10000),
      status: "pending",
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      name: `User ${Math.floor(Math.random() * 1000)}`,
    },
    {
      index: 13,
      id: "728ed52f-" + Math.random().toString(36).substr(2, 9),
      amount: Math.floor(Math.random() * 10000),
      status: "pending",
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      name: `User ${Math.floor(Math.random() * 1000)}`,
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
