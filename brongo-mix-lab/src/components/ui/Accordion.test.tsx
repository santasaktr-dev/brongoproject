import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Accordion } from "./Accordion";

describe("Accordion", () => {
  it("renders each item title", () => {
    render(<Accordion items={[{ id: "a", title: "หัวข้อ A", body: <p>เนื้อหา A</p> }]} />);
    expect(screen.getByText("หัวข้อ A")).toBeInTheDocument();
  });

  it("fires onOpen with the id when a section is opened", () => {
    const onOpen = vi.fn();
    render(<Accordion onOpen={onOpen} items={[{ id: "sec-1", title: "หัวข้อ", body: "b" }]} />);
    const details = screen.getByText("หัวข้อ").closest("details") as HTMLDetailsElement;
    details.open = true;
    fireEvent(details, new Event("toggle"));
    expect(onOpen).toHaveBeenCalledWith("sec-1");
  });
});
