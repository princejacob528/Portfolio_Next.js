/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "+91 98474 87107",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "princejacob528@gmail.com",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Address",
    description:
      "Chirayath House, Malayidamthuruth P.O, Malayidamthuruth, Pin:683561",
  },
];

import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [ isLoading, setIsLoading ] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle select change
  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      service: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Your message has been sent successfully!");
        setIsLoading(false);
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        toast.error("Failed to send the message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:h-[54%] order-2 xl:order-none">
            {/* form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl"
            >
              <h3 className="text-4xl text-accent">Let's work together</h3>
              <p className="text-white/60">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Commodi dolorem similique quas ad magni.
              </p>

              {/* Input fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              {/* Select field */}
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    <SelectItem value="Web_App">Web App Development</SelectItem>
                    <SelectItem value="Frontend_Dev">Frontend Development</SelectItem>
                    <SelectItem value="Frontend_Design">Frontend Design</SelectItem>
                    <SelectItem value="Backend_Design">Backend Design</SelectItem>
                    <SelectItem value="DB_Mange">Database Management</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Textarea */}
              <Textarea
                name="message"
                placeholder="Type your message here."
                className="h-[200px]"
                value={formData.message}
                onChange={handleInputChange}
              />

              {/* Submit button */}
              <Button size="md" className="max-w-40" type="submit">
                {isLoading? "Sending...":"Send Message"}
              </Button>
            </form>
          </div>

          {/* Info */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-6">
                    <div className="w-[52px] h-[52px] xl:h-[72px] xl:w-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                      <div>{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60 text-sm">{item.title}</p>
                      <h3 className="text-md">{item.description}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
