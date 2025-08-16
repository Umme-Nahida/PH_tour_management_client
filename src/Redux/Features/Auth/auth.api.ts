import { baseApi } from "@/Redux/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        register: builder.mutation({
            query:(userInfo)=>(
                {
                url:"/auth/register",
                method:"POST",
                body:userInfo
               }
            )
        })
    })
})

export const {useRegisterMutation} = authApi