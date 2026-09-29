import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/partnerships")({
  component: PartnershipsLayout,
});

function PartnershipsLayout() {
  return <Outlet />;
}
