import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScoreDisplay } from "./ScoreDisplay";

describe("ScoreDisplay", () => {
  it("shows the score and reaction copy", () => {
    render(<ScoreDisplay score={100} reaction={{ min: 100, state: "perfect", headline: "หัวข้อผล", copy: "คำอธิบาย" }} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("หัวข้อผล")).toBeInTheDocument();
    expect(screen.getByText("คำอธิบาย")).toBeInTheDocument();
  });
});
