import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MixProgress } from "./MixProgress";

describe("MixProgress", () => {
  it("labels how many categories are filled", () => {
    const { container } = render(
      <MixProgress categories={[{ id: "api", title: "A" }, { id: "flavor", title: "F" }]} filled={new Set(["api"])} />,
    );
    expect(container.querySelector(".mix-progress")?.getAttribute("aria-label")).toBe("เลือกส่วนผสมแล้ว 1 จาก 2 หมวด");
    expect(container.querySelectorAll("li.done")).toHaveLength(1);
  });
});
