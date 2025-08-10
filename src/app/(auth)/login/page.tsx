"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage(){
    const router = useRouter();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        // preventDefaultって何
        e.preventDefault()
        if(username.trim() && password.trim()){
            document.cookie= 
        "dummy=1; path=/; max-age=" + 60 * 60 * 24 + "; SameSite=Lax"
            router.push("/alerts");
        }else{
            setError("Both field are required")
        }
    }
    return (
        <div>
            <Card className="justify-center align-center">
                <CardHeader>
                    <h1 className="text-medium font-semibold text-muted-foreground"></h1>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            placeholder="username"
                            value = {username}
                            // なぜエラーから入れている？
                            onChange={(e)=>setUsername(e.target.value)}
                            required
                        />
                        <Input
                        placeholder="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                        />
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        <Button type="submit" color="text-muted-foreground">
                            login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}