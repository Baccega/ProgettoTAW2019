import { Component, OnInit } from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UseExistingWebDriver } from "protractor/built/driverProviders";
import { User } from "src/app/models/User";
import { UserService } from "src/app/services/user.service";
import { StatisticsService } from "src/app/services/statistics.service";

@Component({
  selector: "app-cashier-statistics-user",
  templateUrl: "./cashier-statistics-user.component.html",
  styleUrls: ["./cashier-statistics-user.component.scss"]
})
export class CashierStatisticsUserComponent implements OnInit {
  userId;
  user: User;
  // preparedDishes;
  // customersServed;
  stat;
  roles = ["Waiter", "Chef", "Bartender", "Cashier"];

  constructor(
    private utilsService: UtilsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private statisticService: StatisticsService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(newUserId => {
      this.userId = newUserId["user"];
      this.user = this.userService.getUser(this.userId);
      this.utilsService.setTitle("Employees Management");
      this.stat = this.statisticService.getTodayEmployeeStatistics(this.userId);
    });
  }

  navigateToStatistics() {
    this.router.navigate(["../../"], { relativeTo: this.activatedRoute });
  }

  async deleteUser() {
    this.utilsService.setProgressbar(true);
    await this.userService.deleteUser(this.userId);
    this.utilsService.setProgressbar(false);
    this.router.navigate(["../../"], { relativeTo: this.activatedRoute });
  }
}
