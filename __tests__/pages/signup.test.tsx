import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import SignupPage from "@/app/signup/page";

vi.mock("@/lib/graphql", () => ({
  signup: vi.fn(),
}));

import { signup } from "@/lib/graphql";

describe("SignupPage", () => {
  it("이메일, 비밀번호, 제출 버튼이 렌더링된다", () => {
    render(<SignupPage />);
    expect(screen.getByPlaceholderText("이메일")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("비밀번호")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "회원가입" })).toBeInTheDocument();
  });

  it("성공 시 성공 메시지가 표시된다", async () => {
    vi.mocked(signup).mockResolvedValueOnce({ email: "test@example.com" });
    render(<SignupPage />);
    fireEvent.change(screen.getByPlaceholderText("이메일"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("비밀번호"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: "회원가입" }));
    await waitFor(() => expect(screen.getByText(/가입 완료/)).toBeInTheDocument());
  });

  it("실패 시 에러 메시지가 표시된다", async () => {
    vi.mocked(signup).mockRejectedValueOnce(new Error("이미 존재하는 이메일입니다"));
    render(<SignupPage />);
    fireEvent.change(screen.getByPlaceholderText("이메일"), { target: { value: "dup@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("비밀번호"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: "회원가입" }));
    await waitFor(() => expect(screen.getByText(/이미 존재하는 이메일/)).toBeInTheDocument());
  });
});
