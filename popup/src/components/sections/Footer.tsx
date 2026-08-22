import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center px-2 pt-6 pb-8">
      <Button
        onClick={() => window.close()}
        type="button"
        size="lg"
        className="min-w-24 rounded-full"
      >
        Done
      </Button>
    </footer>
  );
};

export default Footer;
