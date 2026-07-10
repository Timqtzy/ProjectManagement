import { Input, InputGroup, Kbd } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"

const Searchbar = () => (
    <InputGroup startElement={<LuSearch />} endElement={<Kbd>⌘K</Kbd>}>
        <Input placeholder="Search" />
    </InputGroup>
)

export default Searchbar