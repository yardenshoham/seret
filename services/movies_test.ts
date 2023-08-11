import {
  _cinemaCityDateToShowingDate,
  _movielandDateToShowingDate,
} from "~/services/movies.ts";
import { assertEquals } from "std/testing/asserts.ts";

Deno.test("cinema city date to showing date", () => {
  const date = "11/08/2023 21:40";
  const showingDate = _cinemaCityDateToShowingDate(date);
  assertEquals(showingDate, {
    minute: 40,
    hour: 21,
    day: 11,
    month: 8,
    year: 2023,
  });

  const date2 = "15/08/2023 20:30";
  const showingDate2 = _cinemaCityDateToShowingDate(date2);
  assertEquals(showingDate2, {
    minute: 30,
    hour: 20,
    day: 15,
    month: 8,
    year: 2023,
  });
});

Deno.test("movieland date to showing date", () => {
  const date = "2023-08-11T21:30:00";
  const showingDate = _movielandDateToShowingDate(date);
  assertEquals(showingDate, {
    minute: 30,
    hour: 21,
    day: 11,
    month: 8,
    year: 2023,
  });

  const date2 = "2023-08-12T00:00:00";
  const showingDate2 = _movielandDateToShowingDate(date2);
  assertEquals(showingDate2, {
    minute: 0,
    hour: 0,
    day: 12,
    month: 8,
    year: 2023,
  });
});
