using Microsoft.EntityFrameworkCore.Migrations;

namespace thumbstack.webapi.Migrations
{
    public partial class OrderModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Quantity",
                table: "OrderItem",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Quantity",
                table: "OrderItem",
                type: "float",
                nullable: false,
                oldClrType: typeof(int));
        }
    }
}
