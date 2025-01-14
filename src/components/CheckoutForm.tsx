"use client"
import {usePaystackPayment} from "react-paystack"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"




const checkOutFormSchema=z.object({
    email:z.string().trim().email({ message:"Invalid Email"})
})



export default function CheckoutForm(amount:{amount:number}) {
    
    const payStackKey=process.env.NEXT_PUBLIC_PS_KEY
    if(!payStackKey){ throw new Error('PS key is missing')}
    const amountInCents=amount.amount*100
    const form =useForm<z.infer<typeof checkOutFormSchema>>({
        resolver:zodResolver(checkOutFormSchema),
        defaultValues:{
            email:""
        }
    })
    const {watch} =form
    const email=watch('email')
    const config = {
        reference: (new Date()).getTime().toString(),
        email,
        amount: amountInCents,
        currency:'KES',
        publicKey:payStackKey,
    };

      const onClose = () => {
        console.log('closed')
      }
      const initializePayment = usePaystackPayment(config);

    function onSumbit(values: z.infer<typeof checkOutFormSchema>){
        initializePayment({onClose})
        console.log(values)
        console.log(amountInCents)
    }
    
    
  return (
    <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Email Address </FormLabel>
                            <FormControl>
                                <Input placeholder="email@mail.com" {...field} required/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type='submit' size='lg' 
                    // className="w-full bg-green-400 hover:bg-green-500"
                    className="w-full bg-bts-GreenOne hover:bg-green-500"
                >
                    Start payment process</Button>
            </form>
        </Form>
    </>
  )
}
