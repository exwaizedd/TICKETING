// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TicketingSystem is ERC721 {

    //Define Ticket Structure
    struct Ticket {
        string ticketType;
        uint256 amount;
        uint256 validUntil;
        address owner;
        bool used;
    }
    //Define mapping for tickets
    mapping(uint256 => Ticket) private tickets;

    uint256 private ticketId = 1;

    constructor() ERC721Base ("TicketingSystem", "TICKET") {}

    //Function to mint a ticket 
    function mintTicket(string memory _ticketType, uint256 _amount, uint256 _validUntil)
        external
    {
        //Mapping a Minted Ticket to the ticket array
        tickets[ticketId] = Ticket(_ticketType, _amount, _validUntil, msg.sender, false);
        _safeMint(msg.sender, ticketId);
        ticketId++;
    }

    function useTicket(uint256 _ticketId) external {
        require(_isApprovedOrOwner(msg.sender, _ticketId), "Not approved or owner");
        require(!tickets[_ticketId].used, "Ticket has already been used");
    //mark ticket as used
        tickets[_ticketId].used = true;
    }

    function getTicket(uint256 _ticketId)
        external
        view
        returns (
            string memory,
            uint256,
            uint256,
            address,
            bool
        )
    {
        Ticket storage ticket = tickets[_ticketId];
        return (ticket.ticketType, ticket.amount, ticket.validUntil, ticket.owner, ticket.used);
    }
}
