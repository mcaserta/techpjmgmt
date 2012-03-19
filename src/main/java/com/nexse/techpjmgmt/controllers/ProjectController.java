package com.nexse.techpjmgmt.controllers;

import com.nexse.techpjmgmt.domain.Developer;
import com.nexse.techpjmgmt.domain.Project;
import com.nexse.techpjmgmt.util.AjaxResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/projects")
@Controller
public class ProjectController {


    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    public
    @ResponseBody
    AjaxResponse<Project> list() {
        return new AjaxResponse<Project>(Project.findAllProjects());
    }

    @RequestMapping(value = "/new", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
    public
    @ResponseBody
    AjaxResponse<Project> create(@RequestBody() Project project, @RequestParam(value = "iddev", required = true) Long idOwner) {
        final AjaxResponse<Project> response = new AjaxResponse<Project>();
        try {
            Developer developer = Developer.findDeveloper(idOwner);
            developer.getProjects().add(project);
            developer.merge();
            response.add(project);
        } catch (Exception e) {
            e.printStackTrace();
            response.setSuccess("false");
        }
        return response;
    }


}
