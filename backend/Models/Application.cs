namespace Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public required string Company { get; set; }
        public required string Position { get; set; }
        public required string Status { get; set; }
        public required DateTime AppliedDate { get; set; }
        
    }
}