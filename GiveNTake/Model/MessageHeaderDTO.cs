namespace GiveNTake.Model
{
    public class MessageHeaderDTO
    {
        public int MessageId { get; set; }
        public string FromUserId { get; set; }
        public string ToUserId { get; set; }
        public int ProductId { get; set; }

        public string Title { get; set; }

    }
}