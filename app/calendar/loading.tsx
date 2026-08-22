import { Skeleton } from "@/components/ui/skeleton";

export default function CalendarLoading() {
  return (
    <div className="container py-10">
      <Skeleton className="h-9 w-56" />
      <Skeleton className="mt-2 h-5 w-72" />
      <Skeleton className="mt-8 h-[720px] w-full rounded-2xl" />
    </div>
  );
}
