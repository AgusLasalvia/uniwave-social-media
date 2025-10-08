package routes

import (
	"uniwave/controllers"
	"uniwave/middlewares"

	"github.com/gin-gonic/gin"
)

func UserRouter(router *gin.Engine) {
	userController := controllers.NewUserController()
	user := router.Group("/user")

	user.PATCH("/update", middlewares.TokenMiddleware(), userController.Update)

}
