package  com.ird.faa.ws.rest.provided.facade.admin;

import com.ird.faa.service.admin.facade.CommandeTagAdminService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import com.ird.faa.bean.CommandeTag;
import com.ird.faa.ws.rest.provided.converter.CommandeTagConverter;
import com.ird.faa.ws.rest.provided.vo.CommandeTagVo;

@Api("Manages commandeTag services")
@RestController
@RequestMapping("api/admin/commandeTag")
public class CommandeTagRestAdmin {

@Autowired
private CommandeTagAdminService commandeTagService;

@Autowired
private CommandeTagConverter commandeTagConverter;


            @ApiOperation("Updates the specified  commandeTag")
            @PutMapping("/")
            public  CommandeTagVo update(@RequestBody  CommandeTagVo  commandeTagVo){
            CommandeTag commandeTag = commandeTagConverter.toItem(commandeTagVo);
            commandeTag = commandeTagService.update(commandeTag);
            return commandeTagConverter.toVo(commandeTag);
            }

    @ApiOperation("Finds a list of all commandeTags")
    @GetMapping("/")
    public List<CommandeTagVo> findAll(){
        return commandeTagConverter.toVo(commandeTagService.findAll());
    }

    @ApiOperation("Finds a commandeTag with associated lists by id")
    @GetMapping("/detail/id/{id}")
    public CommandeTagVo findByIdWithAssociatedList(@PathVariable Long id){
    return commandeTagConverter.toVo(commandeTagService.findByIdWithAssociatedList(id));
    }

    @ApiOperation("Search commandeTag by a specific criteria")
    @PostMapping("/search")
    public List<CommandeTagVo> findByCriteria(@RequestBody CommandeTagVo commandeTagVo){
        return commandeTagConverter.toVo(commandeTagService.findByCriteria(commandeTagVo));
        }

            @ApiOperation("Finds a commandeTag by id")
            @GetMapping("/id/{id}")
            public CommandeTagVo findById(@PathVariable Long id){
            return commandeTagConverter.toVo(commandeTagService.findById(id));
            }

            @ApiOperation("Saves the specified  commandeTag")
            @PostMapping("/")
            public CommandeTagVo save(@RequestBody CommandeTagVo commandeTagVo){
            CommandeTag commandeTag = commandeTagConverter.toItem(commandeTagVo);
            commandeTag = commandeTagService.save(commandeTag);
            return commandeTagConverter.toVo(commandeTag);
            }

            @ApiOperation("Delete the specified commandeTag")
            @DeleteMapping("/")
            public int delete(@RequestBody CommandeTagVo commandeTagVo){
            CommandeTag commandeTag = commandeTagConverter.toItem(commandeTagVo);
            return commandeTagService.delete(commandeTag);
            }

            @ApiOperation("Deletes a commandeTag by id")
            @DeleteMapping("/id/{id}")
            public int deleteById(@PathVariable Long id){
            return commandeTagService.deleteById(id);
            }
        @ApiOperation("find by commande reference")
        @GetMapping("/commande/reference/{reference}")
        public List<CommandeTag> findByCommandeReference(@PathVariable String reference){
        return commandeTagService.findByCommandeReference(reference);
        }

        @ApiOperation("delete by commande reference")
        @DeleteMapping("/commande/reference/{reference}")
        public int deleteByCommandeReference(@PathVariable String reference){
        return commandeTagService.deleteByCommandeReference(reference);
        }

        @ApiOperation("find by commande id")
        @GetMapping("/commande/id/{id}")
        public List<CommandeTag> findByCommandeId(@PathVariable Long id){
        return commandeTagService.findByCommandeId(id);
        }

        @ApiOperation("delete by commande id")
        @DeleteMapping("/commande/id/{id}")
        public int deleteByCommandeId(@PathVariable Long id){
        return commandeTagService.deleteByCommandeId(id);
        }

        @ApiOperation("find by tag reference")
        @GetMapping("/tag/reference/{reference}")
        public List<CommandeTag> findByTagReference(@PathVariable String reference){
        return commandeTagService.findByTagReference(reference);
        }

        @ApiOperation("delete by tag reference")
        @DeleteMapping("/tag/reference/{reference}")
        public int deleteByTagReference(@PathVariable String reference){
        return commandeTagService.deleteByTagReference(reference);
        }

        @ApiOperation("find by tag id")
        @GetMapping("/tag/id/{id}")
        public List<CommandeTag> findByTagId(@PathVariable Long id){
        return commandeTagService.findByTagId(id);
        }

        @ApiOperation("delete by tag id")
        @DeleteMapping("/tag/id/{id}")
        public int deleteByTagId(@PathVariable Long id){
        return commandeTagService.deleteByTagId(id);
        }



            }
