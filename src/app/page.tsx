'use client'
import { Button, Card } from "@/components/commons";

export default function Home() {
    return (
        <main className='flex flex-col items-center justify-between p-24'>
            <span>Home Page</span>
            <Button onClick={() => console.log('Button clicked!')}>Click Me</Button>
            <Card withShadow>test 123123123</Card>
        </main>
    );
}
