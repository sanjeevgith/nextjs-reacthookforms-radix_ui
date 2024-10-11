
import '@radix-ui/themes/styles.css';
import { Flex, Text, Button } from "@radix-ui/themes";

export default function Home() {
  return (
    <div >
    <h3>Home page</h3>
    <Flex direction="column" gap="2">
			<Text>Hello from Radix Themes :)</Text>
			<Button>Let's go</Button>
		</Flex>
    </div>
  );
}
