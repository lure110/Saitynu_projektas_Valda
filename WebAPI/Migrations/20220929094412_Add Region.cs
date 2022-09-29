using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webAPI.Migrations
{
    public partial class AddRegion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Landplots_RegionId",
                table: "Landplots",
                column: "RegionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Landplots_Regions_RegionId",
                table: "Landplots",
                column: "RegionId",
                principalTable: "Regions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Landplots_Regions_RegionId",
                table: "Landplots");

            migrationBuilder.DropIndex(
                name: "IX_Landplots_RegionId",
                table: "Landplots");
        }
    }
}
