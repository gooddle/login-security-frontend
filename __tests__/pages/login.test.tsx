import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import LoginPage from "@/app/login/page";

vi.mock("@/lib/graphql", () => ({
  login: vi.fn(),
}));

import { login } from "@/lib/graphql";

describe("LoginPage", () => {
  it("이메일, 비밀번호, 제출 버튼이 렌더링된다", () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText("이메일")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("비밀번호")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "로그인" })).toBeInTheDocument();
  });

  it("성공 시 환영 메시지가 표시된다", async () => {
    vi.mocked(login).mockResolvedValueOnce({ message: "로그인 성공", email: "test@example.com" });
    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText("이메일"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("비밀번호"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: "로그인" }));
    await waitFor(() => expect(screen.getByText(/로그인 성공/)).toBeInTheDocument());
  });

  it("실패 시 에러 메시지가 표시된다", async () => {
    vi.mocked(login).mockRejectedValueOnce(new Error("인증 실패"));
    render(<LoginPage />);
    fireEvent.change(screen.getByPlaceholderText("이메일"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("비밀번호"), { target: { value: "wrong" } });
    fireEvent.click(screen.getByRole("button", { name: "로그인" }));
    await waitFor(() => expect(screen.getByText(/인증 실패/)).toBeInTheDocument());
  });
});
