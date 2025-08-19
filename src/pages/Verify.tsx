import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/Redux/Features/Auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { data, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z, { email } from "zod";


const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})


const Verify = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [sendOtp] = useSendOtpMutation()
    const [verifyOtp] = useVerifyOtpMutation()
    const [email] = useState(location.state);
    const [confirm, setConfirm] = useState(false);
    const [timer, setTimer] = useState(10);

    useEffect(() => {
        if (!email) {
            navigate("/")
        }
    }, [])

    useEffect(()=>{
        const timerId = setInterval(()=>{
            if(!email && !confirm){
                return
            }
            if(email && confirm){
               setTimer((prev)=>(
                   prev > 0 ? prev -1 : 0)) 
            }
        },1000)

        return ()=>clearInterval(timerId)
    },[email,confirm])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { pin: "" }
    })

    const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        const userInfo = {
            email,
            otp: data.pin
        }

         const toastId = toast.loading("Sending OTP")
        try {
            setConfirm(true)
            const res = await verifyOtp(userInfo)

            if(res.success ){
              toast.success("send OTP successfully",{id: toastId})
            }
        } catch (err) {
            console.log(err)
        }

    }


    const handleConfirm = async() =>{
        const toastId = toast.loading("Verifying OTP")
        try {
            setConfirm(true)
            const res = await sendOtp({ email: email })

            if(res.success ){
              toast.success("send OTP successfully",{id: toastId})
            }
        } catch (err) {
            console.log(err)
        }
    }

    const resetOTP = async() =>{
            setTimer(10)
    }


    return (
        <div className="grid place-content-center h-screen">


            {
                confirm ? (
                    <Card className="max-w-fit">
                        <CardHeader>
                            <CardTitle>Verify Your Email Address</CardTitle>
                            <CardDescription>Please enter the OTP-4 digit code</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="pin"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>One-Time Password</FormLabel>
                                                <FormControl>
                                                    <InputOTP maxLength={6} {...field}>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={0} />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={1} />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={2} />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={3} />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={4} />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={5} />
                                                        </InputOTPGroup>
                                                    </InputOTP>
                                                </FormControl>
                                                <FormDescription>
                                                        <Button className={cn("p-0 mr-1",{
                                                            "cursor-pointer": timer ===0,
                                                            "text-gray-500": timer !== 0
                                                        })}  type="reset" onClick={resetOTP} variant={"link"} >Reset OTP</Button>
                                                        {timer}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button form="otp-form" type="submit">Submit</Button>
                                </form>
                            </Form>
                        </CardContent>

                    </Card>

                ) : (
                    <Card className="">
                        <CardHeader>
                            <CardTitle>Verify Your Email Address</CardTitle>
                            <CardDescription>we will send you OTP at {email as any}</CardDescription>
                            {/* <CardAction>Card Action</CardAction> */}
                        </CardHeader>
                        <CardFooter>
                            <Button onClick={handleConfirm} className="w-[300px]">Confirm</Button>
                        </CardFooter>
                    </Card>
                )
            }



        </div>
    );
};

export default Verify;