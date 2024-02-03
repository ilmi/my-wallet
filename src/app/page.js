import { CreateItem } from "@/components/CreateItem";
import { ItemList } from "@/components/ItemList";

export const dynamic = "force-dynamic";

async function getData() {
  const res = await fetch("https://v1.appbackend.io/v1/rows/kd7RYJX2bPIj");
  const data = await res.json();
  return data;
}

export default async function Home() {
  const { data } = await getData();

  return (
    <main className="max-w-xl m-auto space-y-4">
      <h1 className="font-bold text-lg">My Wallet</h1>
      <CreateItem />
      <ItemList data={data} />
    </main>
  );
}
