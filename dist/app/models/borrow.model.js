"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrow_schemas_1 = require("../schemas/borrow.schemas");
exports.Borrow = (0, mongoose_1.model)("Borrow", borrow_schemas_1.BorrowSchema);
