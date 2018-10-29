using System.ComponentModel.DataAnnotations;

namespace GiveNTake.Model
{
    public class NewMessageDTO
    {
        [Required]
        public string ToUserId { get; set; }
        [Required]
        public int ProductId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }
        [Required]
        [MaxLength(250)]
        public string Body { get; set; }

    }
}