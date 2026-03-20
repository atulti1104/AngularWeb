import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class AssistantComponent {

  open = false;
  message = '';

  chats: {text:string, from:'user'|'bot'}[] = [
    { text: 'Hello 👋 I am your shopping assistant. Ask me anything!', from: 'bot'}
  ];

  toggle(){
    this.open = !this.open;
  }

  send(){
    if(!this.message.trim()) return;

    const userMsg = this.message.toLowerCase();
    this.chats.push({text:this.message, from:'user'});

    let reply = this.generateReply(userMsg);

    setTimeout(()=>{
      this.chats.push({text:reply, from:'bot'});
    },500);

    this.message='';
  }

  generateReply(msg:string):string{

    // PRODUCTS
    if(msg.includes('pot') || msg.includes('decor'))
      return 'You can check our Home Decor category for handmade pots 🏺';

    if(msg.includes('gift'))
      return 'Handmade candles and paintings are perfect gifts 🎁';

    if(msg.includes('cheap') || msg.includes('under 500'))
      return 'We have many products under ₹500 in Budget Picks section';

    // ORDER
    if(msg.includes('delivery'))
      return 'Delivery takes 3-5 days across India 🚚';

    if(msg.includes('payment'))
      return 'We support UPI, QR payment and cash on delivery';

    if(msg.includes('return'))
      return 'Return available within 7 days if product damaged';

    if(msg.includes('order'))
      return 'You can order by opening a product and clicking Buy Now';

    // ACCOUNT
    if(msg.includes('login'))
      return 'Use login/signup option on top right corner';

    if(msg.includes('contact'))
      return 'You can contact seller via WhatsApp option in cart page';

    // GREETING
    if(msg.includes('hi') || msg.includes('hello'))
      return 'Hi there 😊 What are you looking for today?';

    return 'I am still learning 🤖 Try asking about products, price, delivery or payment';
  }
}
