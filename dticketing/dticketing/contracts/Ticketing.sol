// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";

contract TicketingSystem is ERC721Enumerable, Ownable {

    //Define Ticket Structure
    struct Ticket {
        string ticketType;
        uint256 validUntil;
        address owner;
        uint amount;
        bool used;
    }

    struct OwnerInfo{
        uint256 [] TicketIds;
        uint TotalTickets;
    }

    //Define mapping for tickets
    mapping(uint256 => Ticket) public TICKET;

    mapping (address => OwnerInfo) public OWNERINFO;
    
    using Strings for uint256;
    string public baseURI;
    string public baseExtension = ".json";
    uint256 public maxSupply = 1000000000000;
    uint256 public maxMintAmount = 1;
    bool public paused = false;
    uint256 public ticketId;

    event TicketCreated(string ticketType, uint256 validUntil,address owner, uint amount);
    event TicketUsed(uint TicketId, address user);

    constructor() ERC721("TicketingSystem", "TICKET") {}


    //Function to mint a ticket 
    function mint(string memory _ticketType, uint256 _validUntil) public payable {  

        Ticket storage newTicket = TICKET[ticketId];
        OwnerInfo storage ownerData = OWNERINFO[msg.sender];
        newTicket.ticketType = _ticketType;
        newTicket.validUntil =_validUntil;
        newTicket.owner = msg.sender;
        newTicket.amount = msg.value;
        ownerData.TicketIds.push(ticketId);
        ownerData.TotalTickets += 1;
        _safeMint(msg.sender, ticketId);
        ticketId++;
        emit TicketCreated (_ticketType, _validUntil, msg.sender, msg.value);
    }

    function useTicket(uint256 _ticketId) external {
        require(_isApprovedOrOwner(msg.sender, _ticketId), "Not approved or owner");
        require(!TICKET[_ticketId].used, "Ticket has already been used");
        TICKET[_ticketId].used = true;
        emit TicketUsed(_ticketId, msg.sender);
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
        Ticket storage ticket = TICKET[_ticketId];
        return (ticket.ticketType, ticket.amount, ticket.validUntil, ticket.owner, ticket.used);
    }
}
