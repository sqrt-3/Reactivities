using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class ActivityAttendeeChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activity_Activities_ActivityId",
                table: "Activity");

            migrationBuilder.DropForeignKey(
                name: "FK_Activity_AspNetUsers_AppUserId",
                table: "Activity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Activity",
                table: "Activity");

            migrationBuilder.RenameTable(
                name: "Activity",
                newName: "ActivityAttendees");

            migrationBuilder.RenameIndex(
                name: "IX_Activity_ActivityId",
                table: "ActivityAttendees",
                newName: "IX_ActivityAttendees_ActivityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActivityAttendees",
                table: "ActivityAttendees",
                columns: new[] { "AppUserId", "ActivityId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityAttendees_Activities_ActivityId",
                table: "ActivityAttendees",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityAttendees_AspNetUsers_AppUserId",
                table: "ActivityAttendees",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityAttendees_Activities_ActivityId",
                table: "ActivityAttendees");

            migrationBuilder.DropForeignKey(
                name: "FK_ActivityAttendees_AspNetUsers_AppUserId",
                table: "ActivityAttendees");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ActivityAttendees",
                table: "ActivityAttendees");

            migrationBuilder.RenameTable(
                name: "ActivityAttendees",
                newName: "Activity");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityAttendees_ActivityId",
                table: "Activity",
                newName: "IX_Activity_ActivityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Activity",
                table: "Activity",
                columns: new[] { "AppUserId", "ActivityId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Activity_Activities_ActivityId",
                table: "Activity",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Activity_AspNetUsers_AppUserId",
                table: "Activity",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
