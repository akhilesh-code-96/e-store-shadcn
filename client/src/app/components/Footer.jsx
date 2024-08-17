import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import { Button } from "@mui/material";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const Footer = () => {
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await axios.post("/api/user-query", data, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status !== 200) {
        toast({
          description: "Please enter a valid email",
        });
      } else {
        toast({
          description: "Thank you for contacting us!",
        });
      }
      document.getElementById("email").value = "";
      document.getElementById("issue").value = "";
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <footer className="py-8 bg-gray-200 dark:bg-gray-900">
        <div className="container flex flex-col items-center justify-between mx-auto space-y-6 md:flex-row md:space-y-0">
          <div className="flex space-x-6">
            <a
              href="https://github.com/akhilesh-code-96"
              target="_blank"
              className="text-gray-400 hover:text-white"
            >
              <GitHubIcon fontSize="small" />
            </a>
            <a
              href="https://x.com/Akhilesh77_sr"
              target="_blank"
              className="text-gray-400 hover:text-white"
            >
              <XIcon fontSize="small" />
            </a>
            <a
              href="https://linkedin.com/in/akhilesh-srivastav"
              target="_blank"
              className="text-gray-400 hover:text-white"
            >
              <LinkedInIcon />
            </a>
          </div>
          <div>
            <h4 className="text-sm text-neutral-400">
              &copy; 2024 E-Store, Inc. All rights are reseverd.
            </h4>
          </div>
          <div className="w-full md:w-1/3">
            <form
              className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4"
              onSubmit={handleSubmit}
            >
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-md focus:outline-none"
              />
              <Input
                id="issue"
                type="text"
                name="issue"
                placeholder="Your issue"
                className="w-full px-4 py-2 rounded-md focus:outline-none"
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ height: "35px", textTransform: "none" }}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
