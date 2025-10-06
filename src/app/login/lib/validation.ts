
export function validateLoginForm(userName: string, password: string): string {
  if (!userName || userName.trim() === "") {
    return "아이디를 입력해주세요.";
  } else if (userName.length < 3) {
    return "아이디는 최소 3자 이상이어야 합니다.";
  }

  if (!password || password.trim() === "") {
    return "비밀번호를 입력해주세요.";
  } else if (password.length < 4) {
    return "비밀번호는 최소 4자 이상이어야 합니다.";
  }

  return ""; // 모든 입력이 유효할 때
}