import complaints from "../complaints";
import complaintActions from "../../actions/complaints";

test("add a complaint", () => {
  const initialState = [];
  const expectedState = [{ text: "Test" }];
  expect(
    complaints(initialState, complaintActions.addComplaint({ text: "Test" }))
  ).toEqual(expectedState);
});
