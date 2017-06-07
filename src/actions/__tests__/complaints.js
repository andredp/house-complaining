import complaints from "../complaints";

test("adds a complaint", () => {
  expect(complaints.addComplaint({ text: "Qualquer coisa" })).toEqual({
    type: "ADD_COMPLAINT",
    payload: { text: "Qualquer coisa" }
  });
});
