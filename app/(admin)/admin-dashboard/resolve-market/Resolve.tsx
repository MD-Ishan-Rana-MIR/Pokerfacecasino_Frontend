"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const Resolve = () => {
    const [open, setOpen] = useState(false)
    const [outcome, setOutcome] = useState("")

    const handleResolve = () => {
        console.log("Selected Outcome:", outcome)
        setOpen(false)
    }

    return (
        <div>
            <div>
                <h1 className="text-5xl font-semibold text-[#1F2937]">
                    Resolve Markets
                </h1>
                <p className="mt-4 text-2xl text-[#6B6B6B]">
                    Select the final outcome and trigger contract settlements.
                </p>
            </div>

            <div className="px-10.5 py-11.5 rounded-[25px] border-2 border-[#E9EAEB] mt-14 flex justify-between items-center">
                <div className="space-y-3">
                    <button className="bg-[#FFFBEB] py-2.5 px-5 rounded-[14px] text-[#DB7B06] font-semibold text-lg cursor-pointer">
                        CLOSED
                    </button>
                    <h1 className="text-[#1F2937] font-semibold text-4xl">
                        Bitcoin hit $100k before end of Q1 2026?
                    </h1>
                    <p className="text-[#6B6B6B] text-lg">
                        Market ID: #88291 • Closed on March 31
                    </p>
                </div>

                <div>
                    <Button
                        className="text-2xl font-semibold px-6"
                        onClick={() => setOpen(true)}
                    >
                        Resolve
                    </Button>
                </div>
            </div>

            {/* Resolve Modal */}
            <Dialog open={open} onOpenChange={setOpen}  >
                <DialogContent className=" rounded-2xl ">
                    <DialogHeader>
                        <DialogTitle className=" text-[#1F2937] text-4xl font-semibold " >Resolve Outcome</DialogTitle>
                        <DialogTitle className=" textColor text-2xl " >Bitcoin hit $100k?</DialogTitle>
                    </DialogHeader>

                    <div className="  " >
                        <h1 className=" text-[#6B6B6B] text-lg font-medium   " >CHOOSE RESULT</h1>
                    </div>

                    <div className=" flex flex-row mt-3 gap-x-4.5  " >
                        <button className=" border border-[#E9EAEB] rounded-[21px] px-10 py-4 cursor-pointer font-semibold text-[#8C8C8C]    "  >YES</button>
                        <button className=" border border-[#E9EAEB] rounded-[21px] px-10 py-4 cursor-pointer font-semibold text-[#8C8C8C]    "  >NO</button>
                        <button className=" border border-[#E9EAEB] rounded-[21px] px-10 py-4 cursor-pointer font-semibold text-[#8C8C8C]    "  >INVALID</button>
                    </div>

                    <Label className=" textColor " >RESOLUTION PROOF (REQUIRED)</Label>
                    <Input
                        placeholder="Link to Binance historical data...."
                    // value={category}
                    // onChange={(e) => setCategory(e.target.value)}
                    />

                    <div>
                        <button className=" w-full bg-[#4F7FD6] py-4  text-2xl font-semibold text-white  rounded-[21px] cursor-pointer   " >Trigger Contract Resulation</button>
                        <button className=" w-full text-[#8C8C8C] py-4  text-2xl font-semibold cursor-pointer   " >Cancel</button>
                    </div>



                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Resolve