'use client'

import { useState } from 'react'
import { Input } from "../../components/ui/input"
import { ScrollArea } from "../../components/ui/scroll-area"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from '../../components/ui/button'
import { Send } from "lucide-react"

export default function CustomerChat() {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([])
  const [input, setInput] = useState('')
  const [orders, setOrders] = useState([
    { id: 2, item: 'Extra Towels', status: 'In Progress', bookingNumber: 'BK001', roomNumber: '101', orderTime: new Date(Date.now() - 30 * 60000).toISOString() },
    { id: 1, item: 'Room Service', status: 'Pending', bookingNumber: 'BK001', roomNumber: '101', orderTime: new Date(Date.now() - 60 * 60000).toISOString() },
  ])
  const customerInfo = { name: 'John Doe', bookingNumber: 'BK001', roomNumber: '101' }

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }])
      const newOrder = { 
        id: orders.length + 1, 
        item: input, 
        status: 'Pending',
        bookingNumber: customerInfo.bookingNumber,
        roomNumber: customerInfo.roomNumber,
        orderTime: new Date().toISOString()
      }
      setOrders([newOrder, ...orders])
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: `Thank you for your order, ${customerInfo.name}. Your ${input} request has been received and is pending.`, 
          sender: 'bot' 
        }])
      }, 1000)
      setInput('')
    }
  }

  return (
    <div className="w-full max-w-4xl h-screen flex flex-col bg-background">
      <div className="bg-primary text-primary-foreground p-4">
        <h2 className="text-2xl font-bold">Customer Support</h2>
      </div>
      <div className="flex-grow flex flex-col md:flex-row gap-4 p-4 overflow-hidden">
        <Card className="w-full md:w-1/3 h-auto md:h-full">
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Name:</strong> {customerInfo.name}</p>
            <p><strong>Booking Number:</strong> {customerInfo.bookingNumber}</p>
            <p><strong>Room Number:</strong> {customerInfo.roomNumber}</p>
          </CardContent>
          <CardHeader>
            <CardTitle>Your Orders</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-200px)] overflow-auto">
            <ScrollArea className="h-full">
              {orders.map(order => (
                <Card key={order.id} className="mb-2">
                  <CardContent className="p-2">
                    <p className="font-medium">{order.item}</p>
                    <Badge variant={order.status === 'Completed' ? 'default' : 'secondary'}>
                      {order.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(order.orderTime).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <div className="w-full md:w-2/3 flex flex-col h-full">
          <ScrollArea className="flex-grow border rounded-md p-4 mb-4 bg-muted/50">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                  {message.text}
                </span>
              </div>
            ))}
          </ScrollArea>
          <div className="flex">
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-grow"
            />
            <Button onClick={handleSend} className="ml-2">
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}