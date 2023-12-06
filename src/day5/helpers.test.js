import {it, describe, assert, expect} from "vitest";
import { findMinLocation } from "./helpers.js";

describe("helper", () => {
    it("can find the min location", () => {
        let min = findMinLocation({
            humidity: [{
                from: 2,
                to: 4,
                range: 3
            }]
        }, 'humidity', 2, 1);
        expect(min).toEqual(3);
    })
})