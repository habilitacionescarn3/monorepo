import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./input-otp"

describe("InputOTP", () => {
  it("renders without crash", () => {
    render(
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    )
    // OTPInput renders a hidden input
    const input = document.querySelector("input")
    expect(input).toBeInTheDocument()
  })

  it("renders separator between groups", () => {
    render(
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    )
    expect(document.querySelector("[role=separator]")).toBeInTheDocument()
  })
})
