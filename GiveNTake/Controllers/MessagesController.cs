using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using GiveNTake.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GiveNTake.Controllers
{
    [Route("api/[controller]")]
    public class MessagesController : Controller
    {
        private readonly GiveNTakeContext _context;
        private static IMapper _messagessMapper;

        public MessagesController(GiveNTakeContext context)
        {
            _context = context;
        }

        static MessagesController()
        {

            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Message, MessageHeaderDTO>()
                    .ForMember(dto => dto.FromUserId, opt => opt.MapFrom(product => product.FromUser.Id))
                    .ForMember(dto => dto.ToUserId, opt => opt.MapFrom(product => product.ToUser.Id))
                    .ForMember(dto => dto.ProductId, opt => opt.MapFrom(product => product.Product.ProductId));
                cfg.CreateMap<Message, MessageDTO>()

                    .ForMember(dto => dto.FromUserId, opt => opt.MapFrom(product => product.FromUser.Id))
                    .ForMember(dto => dto.ToUserId, opt => opt.MapFrom(product => product.ToUser.Id))
                    .ForMember(dto => dto.ProductId, opt => opt.MapFrom(product => product.Product.ProductId));
            });
            _messagessMapper = config.CreateMapper();

        }

        [HttpGet("My")]
        public async Task<ActionResult<MessageHeaderDTO[]>> My()
        {
            string userId = "seller1@seller.com";
            var messages = await _context.Messages
                .Include(m => m.FromUser)
                .Include(m => m.ToUser)
                .Include(m => m.Product)
                .Where(msg => msg.FromUser.Id == userId || msg.ToUser.Id == userId)
                .ToListAsync();

            return _messagessMapper.Map<MessageHeaderDTO[]>(messages);
        }

        [HttpGet("{id}", Name = nameof(Details))]   
        public async Task<ActionResult<MessageDTO>> Details(int id)
        {
            var message = await _context.Messages
                .Include(m => m.FromUser)
                .Include(m => m.ToUser)
                .Include(m => m.Product)
                .SingleOrDefaultAsync(m => m.MessageId == id);
            if (message == null)
            {
                return NotFound();
            }
            return _messagessMapper.Map<MessageDTO>(message);
        }

        [HttpPost()]
        public async Task<ActionResult<MessageDTO>> PostMessage([FromBody]NewMessageDTO newMessage)
        {
            User currentUser = await _context.Users.FindAsync(User.Identity.Name);
            User recipient = await _context.Users.FindAsync(newMessage.ToUserId);
            if (recipient == null)
            {
                return BadRequest("The recipient user doesn't exist");
            }

            Product product = await _context.Products.FindAsync(newMessage.ProductId);
            if (product == null)
            {
                return BadRequest("The provided product doesn't exist");
            }

            var message = new Message()
            {
                FromUser = currentUser,
                ToUser = recipient,
                Title = newMessage.Title,
                Body = newMessage.Body,
                Product = product
            };
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Details),
                new { id = product.ProductId },
                _messagessMapper.Map<MessageDTO>(message));
        }
    }
}