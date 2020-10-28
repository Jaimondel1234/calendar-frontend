import { fetchSinToken, fetchConToken } from "../../helpers/fetch";

describe("Pruebas en el helper Fetch", () => {
  let token = "";

  test("fetch Sin token debe de funcionar", async () => {
    const resp = await fetchSinToken(
      "auth",
      { email: "fernando@gmail.com", password: "123456" },
      "POST"
    );

    expect(resp instanceof Response).toBe(true);

    const body = await resp.json();
    expect(body.ok).toBe(true);
    token = body.token;
  });

  test("fetch con token debe de funcionar", async () => {
    localStorage.setItem("token", token);
    const resp = await fetchConToken(
      "events/5f7b33914e636c8965a16247",
      {},
      "DELETE"
    );
    const body = await resp.json();

    expect(body.msg).toBe("Evento no existe por ese id");
  });
});
