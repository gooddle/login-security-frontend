import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import LockoutModal from "@/app/components/LockoutModal";

describe("LockoutModal", () => {
  it("'계정이 잠겼습니다' 제목이 표시된다", () => {
    render(
      <LockoutModal
        message="계정이 잠겼습니다. 29분 59초 후 다시 시도하세요"
        onClose={() => {}}
      />
    );
    expect(screen.getByText("계정이 잠겼습니다")).toBeInTheDocument();
  });

  it("전달받은 message가 표시된다", () => {
    render(
      <LockoutModal
        message="계정이 잠겼습니다. 29분 59초 후 다시 시도하세요"
        onClose={() => {}}
      />
    );
    expect(
      screen.getByText("계정이 잠겼습니다. 29분 59초 후 다시 시도하세요")
    ).toBeInTheDocument();
  });

  it("확인 버튼 클릭 시 onClose가 호출된다", () => {
    const onClose = vi.fn();
    render(
      <LockoutModal
        message="계정이 잠겼습니다. 29분 59초 후 다시 시도하세요"
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "확인" }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
