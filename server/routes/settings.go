package routes

import (
	"uniwave/controllers"
	"uniwave/middlewares"

	"github.com/gin-gonic/gin"
)

func SettingsRouter(router *gin.Engine) {
	settingsController := controllers.NewSettingsController()
	settings := router.Group("/settings")
	
	settings.GET("/", middlewares.TokenMiddleware(), settingsController.GetSettings)
	settings.PATCH("/update", middlewares.TokenMiddleware(), settingsController.UpdateSettings)
}
