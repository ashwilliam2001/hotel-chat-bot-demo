'use client'

import { useState } from 'react'
import { ScrollArea } from "../../components/ui/scroll-area"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { CheckCircle, Clock, Loader2 } from "lucide-react"

type OrderStatus = 'Pending' | 'In Progress' | 'Completed';

interface Order {
  id: number;
  customer: string;
  item: string;
  status: OrderStatus;
  bookingNumber: string;
  roomNumber: string;
  orderTime: string;
  completedBy?: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 3, customer: 'Bob Johnson', item: 'Wake-up Call', status: 'Pending', bookingNumber: 'BK003', roomNumber: '303', orderTime: new Date().toISOString() },
    { id: 2, customer: 'Jane Smith', item: 'Extra Towels', status: 'In Progress', bookingNumber: 'BK002', roomNumber: '202', orderTime: new Date(Date.now() - 30 * 60000).toISOString() },
    { id: 1, customer: 'John Doe', item: 'Room Service', status: 'Completed', completedBy: 'Staff A', bookingNumber: 'BK001', roomNumber: '101', orderTime: new Date(Date.now() - 60 * 60000).toISOString() },
  ])

  const getStatusIcon = (status: OrderStatus) => {
    switch(status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'In Progress':
        return <Loader2 className="h-5 w-5 text-yellow-500 animate-spin" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getBadgeVariant = (status: OrderStatus) => {
    switch(status) {
      case 'Completed':
        return 'secondary'; // Map 'Completed' to 'secondary'
      case 'In Progress':
        return 'outline'; // Map 'In Progress' to 'outline'
      default:
        return 'default'; // Map 'Pending' to 'default'
    }
  }

  return (
    <div className="w-full max-w-4xl h-screen bg-background">
      <div className="bg-primary text-primary-foreground p-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-80px)] p-4">
        {orders.map(order => (
          <Card key={order.id} className="mb-4 overflow-hidden">
            <CardHeader className="bg-muted">
              <CardTitle className="flex justify-between items-center">
                <span>Order #{order.id}</span>
                <Badge 
                  variant={getBadgeVariant(order.status)}
                  className="ml-2"
                >
                  {getStatusIcon(order.status)}
                  <span className="ml-1">{order.status}</span>
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-2">
                <p><strong>Customer:</strong> {order.customer}</p>
                <p><strong>Booking Number:</strong> {order.bookingNumber}</p>
                <p><strong>Room Number:</strong> {order.roomNumber}</p>
                <p><strong>Item:</strong> {order.item}</p>
                <p><strong>Order Time:</strong> {new Date(order.orderTime).toLocaleString()}</p>
                {order.status === 'Completed' && (
                  <p><strong>Completed By:</strong> {order.completedBy}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  )
}