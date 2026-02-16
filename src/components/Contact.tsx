"use client";

import React, { useState } from 'react';
import Section from './Section';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { submitContactForm } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Github, Linkedin, Mail, MapPin } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await submitContactForm(values);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Transmission Successful",
        description: "Your inquiry has been stored in the neural cloud.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Transmission Failed",
        description: "A systemic error occurred. Please try again.",
      });
    }
  }

  return (
    <Section id="contact" className="bg-transparent">
      <div className="grid md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-primary font-headline text-lg uppercase tracking-widest mb-4">Connection</h2>
          <h3 className="text-4xl md:text-6xl font-headline font-bold mb-8">Let's Collaborate.</h3>
          <p className="text-muted-foreground text-lg mb-12 max-w-md">
            Interested in web development, AI projects, or student resource collaborations? Reach out below.
          </p>
          
          <div className="space-y-6">
            <a href="mailto:atifmuneeb909@gmail.com" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest block opacity-50">Email</span>
                <span className="text-lg">atifmuneeb909@gmail.com</span>
              </div>
            </a>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest block opacity-50">Location</span>
                <span className="text-lg">Srinagar, Jammu & Kashmir</span>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="https://linkedin.com/in/aatif-khan-390036273/" target="_blank" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border border-border p-8 md:p-12 bg-card/20 backdrop-blur-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="NAME" 
                        {...field} 
                        className="bg-transparent border-0 border-b border-border rounded-none px-0 h-12 focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-muted-foreground/30 uppercase tracking-widest text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="EMAIL" 
                        {...field} 
                        className="bg-transparent border-0 border-b border-border rounded-none px-0 h-12 focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-muted-foreground/30 uppercase tracking-widest text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder="MESSAGE" 
                        {...field} 
                        className="bg-transparent border-0 border-b border-border rounded-none px-0 min-h-[120px] focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-muted-foreground/30 uppercase tracking-widest text-sm resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-14 rounded-none bg-primary text-background font-headline font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? "TRANSMITTING..." : "INITIATE TRANSMISSION"}
                {!isSubmitting && <Send className="h-4 w-4" />}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      
      <footer className="mt-32 border-t border-border pt-12 flex flex-col md:flex-row justify-between gap-8 opacity-40">
        <div className="text-[10px] uppercase tracking-[0.3em]">
          &copy; 2025 AATIF MUNEEB KHAN — CSE & AI ARCHITECTURE
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] flex gap-8">
          <span>SRINAGAR, J&K</span>
          <span>EST. 2024</span>
        </div>
      </footer>
    </Section>
  );
};

export default Contact;
