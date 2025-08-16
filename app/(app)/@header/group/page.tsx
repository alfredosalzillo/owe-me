"use client";
import dynamic from "next/dynamic";
import { notFound, useSearchParams } from "next/navigation";
import { FC } from "react";

const GroupHeader = dynamic(() => import("@/components/GroupHeader"), {
  ssr: false,
});

const HeaderGroupSlot: FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  if (!id) {
    notFound();
  }
  return <GroupHeader id={id} />;
};

export default HeaderGroupSlot;
