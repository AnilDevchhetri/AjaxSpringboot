package com.ajax.Ajax

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping


@Controller
class MainController {
    @GetMapping("/")
    fun index(model: Model): String{
        model.addAttribute("name","value")
        return "index"
    }
}