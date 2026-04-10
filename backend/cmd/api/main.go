package main

import (
	"log"

	"church-app/internal/config"
	"church-app/internal/handlers"
	"church-app/internal/repository"
	"church-app/internal/routes"

	_ "github.com/lib/pq"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	_ "church-app/docs"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	db, err := config.NewDBConfig().Connect()
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8080", "http://127.0.0.1:8080"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))
	api := router.Group("/api/v1")

	congregationRepo := repository.NewCongregationRepository(db)
	congregationHandler := handlers.NewCongregationHandler(congregationRepo)
	routes.RegisterCongregationRoutes(api, congregationHandler)

	fullTimerRepo := repository.NewFullTimerRepository(db)
	fullTimerHandler := handlers.NewFullTimerHandler(fullTimerRepo)
	routes.RegisterFullTimerRoutes(api, fullTimerHandler)

	pmjMemberRepo := repository.NewPMJMemberRepository(db)
	pmjMemberHandler := handlers.NewPMJMemberHandler(pmjMemberRepo)
	routes.RegisterPMJMemberRoutes(api, pmjMemberHandler)

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	log.Println("Server starting on http://localhost:8081")
	log.Println("Swagger docs available at http://localhost:8081/swagger/index.html")

	if err := router.Run(":8081"); err != nil {
		log.Fatal(err)
	}
}
